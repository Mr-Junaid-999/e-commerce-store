import { Card, CardContent } from "@/app/admin/components/ui/card";

export default function PaymentsPage() {
  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>
      <Card className="bg-[#161B22]">
        <CardContent className="space-y-4">
          <p>
            <strong>Payment Gateway:</strong> Stripe
          </p>
          <p>
            <strong>Last Transaction ID:</strong> TXN-987654321
          </p>
          <p>
            <strong>Total Revenue:</strong> $45,365.00
          </p>
          <p>
            <strong>Pending Payments:</strong> 3 Orders
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
