import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fundsTrackingData } from "@/lib/data";

export function FundsTracking() {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funds Tracking</CardTitle>
        <CardDescription>
          A log of all fund recovery activities on your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundsTrackingData.map((item) => (
              <TableRow key={item.caseId}>
                <TableCell className="font-medium">{item.caseId}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                <TableCell className="text-right">{formatter.format(item.amount)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={item.status === 'Recovered' ? 'default' : 'secondary'} className={item.status === 'Recovered' ? 'bg-green-600' : ''}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
