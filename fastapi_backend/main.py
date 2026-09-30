from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Credit Card Payment System")


@app.get("/")
def home():
    return {"message": "Credit Card Payment System API is running"}


@app.post("/payments/", response_model=schemas.PaymentResponse)
def create_payment(
    payment: schemas.PaymentCreate,
    db: Session = Depends(get_db)
):
    new_payment = models.Payment(
        card_id=payment.card_id,
        amount=payment.amount,
        status="PENDING"
    )

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)

    # Simulate payment processing
    if payment.simulate_result == "SUCCESS":
        new_payment.status = "SUCCESS"
    else:
        new_payment.status = "FAILED"

    db.commit()
    db.refresh(new_payment)

    return new_payment


@app.get("/payments/", response_model=list[schemas.PaymentResponse])
def get_payments(db: Session = Depends(get_db)):
    return db.query(models.Payment).all()


@app.get("/payments/{payment_id}", response_model=schemas.PaymentResponse)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):
    payment = db.query(models.Payment).filter(
        models.Payment.id == payment_id
    ).first()

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return payment


@app.put("/payments/{payment_id}", response_model=schemas.PaymentResponse)
def update_payment(
    payment_id: int,
    payment_data: schemas.PaymentCreate,
    db: Session = Depends(get_db)
):
    payment = db.query(models.Payment).filter(
        models.Payment.id == payment_id
    ).first()

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    payment.card_id = payment_data.card_id
    payment.amount = payment_data.amount

    db.commit()
    db.refresh(payment)

    return payment


@app.delete("/payments/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):
    payment = db.query(models.Payment).filter(
        models.Payment.id == payment_id
    ).first()

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    db.delete(payment)
    db.commit()

    return {"message": "Payment deleted successfully"}
