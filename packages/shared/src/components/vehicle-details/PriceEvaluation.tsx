import React, { Activity, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconGauge as GaugeIcon, IconX } from "@tabler/icons-react";
import { fmt } from "@carveri/shared/lib/gauge";
import { type Book } from "@carveri/shared/types/vehicle-detail";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@carveri/shared/components/ui/alert-dialog.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

interface Props {
  price: number;
  books: Book[];
}

export const PriceEvaluation: React.FC<Props> = ({ price, books }) => {
  const { t } = useTranslation("vehicle-details");
  const min = 12000;
  const max = 33000;
  const percentile = ((price - min) / (max - min)) * 100;
  const label = "BUEN PRECIO";
  const [activeBook, setActiveBook] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <GaugeIcon className="size-4 text-blue-600 dark:text-blue-400" />
            {t('gauge.priceEvaluation')}
          </div>

          <ReportGauge
            percentile={percentile}
            label={label}
            price={price}
            wholesale={min}
            retail={max}
          />

          <div className="grid grid-cols-4 gap-2">
            {books.map((book, i) => {
              const diff = price - book.value;
              const isOver = diff > 0;
              return (
                <Button
                  key={i}
                  onClick={() => {
                    setActiveBook(book.abbr);
                    setIsOpen(true);
                  }}
                  className="h-fit flex-col gap-px py-2"
                  variant="ghost"
                >
                  <span
                    className="inline-flex h-3.5 items-center rounded bg-(--book-color) px-1.5 text-[9px] font-extrabold text-white"
                    style={{ "--book-color": book.color }}
                  >
                    {book.abbr}
                  </span>
                  <span className="text-sm font-bold">{fmt(book.value)}</span>
                  <span
                    className={cn(
                      "inline-flex items-center text-[10px] font-semibold",
                      {
                        "text-red-700 dark:text-red-300": isOver,
                        "text-green-400 dark:text-green-300": !isOver,
                      },
                    )}
                  >
                    {isOver ? "▲" : "▼"}
                    {fmt(Math.abs(diff))}
                  </span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {books.find((item) => item.abbr === activeBook)?.name}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {books.find((item) => item.abbr === activeBook)?.abbr}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid grid-cols-2 gap-2">
              {books
                .find((item) => item.abbr === activeBook)
                ?.details?.map((detail) => (
                  <React.Fragment key={detail.value}>
                    <span>{detail.label}</span>
                    <span className="text-right">{detail.value}</span>
                  </React.Fragment>
                ))}
            </div>
            <AlertDialogFooter>
              <AlertDialogAction>
                <IconX />
                <span>Close</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Activity>
    </>
  );
};
