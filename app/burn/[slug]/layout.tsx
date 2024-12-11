"use client";

import React from "react";
import { Sidebar } from "@/app/_components/Sidebar";
import {
  HomeOutlined,
  IdcardOutlined,
  RocketOutlined,
  SettingOutlined,
  QrcodeOutlined,
  TeamOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useProject } from "@/app/_components/SessionContext";
import { redirect } from "next/navigation";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { project } = useProject();

  if (project?.type !== "burn") {
    redirect("/");
  }

  return (
    <div className="flex h-full">
      <Sidebar
        routes={[
          {
            label: "Overview",
            path: `/burn/${project?.slug}`,
            icon: <HomeOutlined />,
          },
          {
            label: "Timeline",
            path: `/burn/${project?.slug}/timeline`,
            icon: <RocketOutlined />,
          },
          {
            label: "Membership lottery",
            path: `/burn/${project?.slug}/membership`,
            icon: <IdcardOutlined />,
          },
          { separator: true },

          {
            label: "Membership scanner",
            path: `/burn/${project?.slug}/scanner`,
            icon: <QrcodeOutlined />,
          },
          ...(project.roles.includes("admin")
            ? ([
                { separator: true },
                {
                  label: "Configuration",
                  path: `/burn/${project?.slug}/admin/config`,
                  icon: <SettingOutlined />,
                },
                {
                  label: "All members",
                  path: `/burn/${project?.slug}/admin/members`,
                  icon: <TeamOutlined />,
                },
                {
                  label: "Lottery",
                  path: `/burn/${project?.slug}/admin/lottery`,
                  icon: <WalletOutlined />,
                },
              ] as any)
            : []),
          ,
        ]}
      />
      <div className="flex-1 p-16 pl-96">{children}</div>
    </div>
  );
}
