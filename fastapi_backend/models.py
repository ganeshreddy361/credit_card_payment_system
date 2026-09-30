from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    card_id = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
