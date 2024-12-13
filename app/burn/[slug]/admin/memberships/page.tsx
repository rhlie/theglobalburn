"use client";

import React from "react";
import DataTable from "@/app/_components/DataTable";
import { useProject } from "@/app/_components/SessionContext";
import { formatMoney } from "@/app/_components/utils";
import { BurnStage } from "@/utils/types";
import { apiPost } from "@/app/_components/api";

export default function MembershipsPage() {
  const { project } = useProject();
  return (
    <DataTable
      title="Memberships"
      endpoint={`/burn/${project?.slug}/admin/memberships`}
      columns={[
        {
          key: "email",
          label: "Email",
          render: (_, row) => row.profiles.email,
        },
        {
          key: "first_name",
          label: "First name",
        },
        {
          key: "last_name",
          label: "Last name",
        },
        {
          key: "birthdate",
          label: "Date of birth",
          render: (bd) => bd,
        },
        {
          key: "price",
          label: "Price",
          render: (_, { price, price_currency }) =>
            formatMoney(price, price_currency),
        },
      ]}
      globalActions={[
        {
          key: "start-open-sale",
          label: "Start open sale",
          condition: () =>
            project?.burn_config.current_stage === BurnStage.LotteryClosed,
          onClick: () =>
            apiPost(`/burn/${project?.slug}/admin/start-open-sale`),
        },
      ]}
      rowActionsCrud={{
        delete: true,
      }}
    />
  );
}
