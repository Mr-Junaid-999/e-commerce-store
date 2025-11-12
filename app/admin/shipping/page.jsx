import { Card, CardContent } from "@/app/admin/components/ui/card";

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shipping</h1>
      <Card className="bg-[#161B22]">
        <CardContent>
          <ul className="space-y-3">
            <li>
              <strong>Courier Partner:</strong> DHL Express
            </li>
            <li>
              <strong>Average Delivery Time:</strong> 3–5 Business Days
            </li>
            <li>
              <strong>Shipping Regions:</strong> Worldwide
            </li>
            <li>
              <strong>Support Email:</strong> shipping@store.com
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
