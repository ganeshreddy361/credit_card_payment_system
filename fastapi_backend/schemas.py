from pydantic import BaseModel
from datetime import datetime
from typing import Literal


class PaymentBase(BaseModel):
    card_id: int
    amount: float


class PaymentCreate(PaymentBase):
    simulate_result: Literal["SUCCESS", "FAILED"] = "SUCCESS"


class PaymentResponse(PaymentBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
