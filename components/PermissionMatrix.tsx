import { Checkbox } from "@/components/ui/checkbox";

const modules = [
  "Dashboard",
  "Merchant list",
  "Contact Persons",
  "Admin Set up",
  "Transactions",
  "Reports",
  "Audit Log",
  "Short Codes",
];

const actions = ["View", "Create", "Edit", "Delete", "Approve"];

export function PermissionMatrix({
  value,
  onChange,
}: {
  value: Record<string, Record<string, boolean>>;
  onChange: (val: Record<string, Record<string, boolean>>) => void;
}) {
  const toggleSingle = (module: string, action: string) => {
    const current = value?.[module]?.[action] || false;
    const updated = {
      ...value,
      [module]: {
        ...value[module],
        [action]: !current,
      },
    };
    onChange(updated);
  };

  const toggleAllForModule = (module: string) => {
    const isAllChecked = actions.every((action) => value?.[module]?.[action]);
    const updatedModulePermissions = actions.reduce((acc, action) => {
      acc[action] = !isAllChecked;
      return acc;
    }, {} as Record<string, boolean>);

    const updated = {
      ...value,
      [module]: updatedModulePermissions,
    };
    onChange(updated);
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-sm border border-[#F9F9F9]">
        <thead>
          <tr className="bg-white h-12">
            <th className="p-4 text-left ">
              <Checkbox className="mr-6 pt-4" />
              Assign Permissions
            </th>
            {actions.map((action) => (
              <th key={action} className="p-2 text-center">
                {action}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => {
            const isAllChecked = actions.every(
              (action) => value?.[module]?.[action]
            );
            return (
              <tr
                key={module}
                className={`h-12 transition ${
                  index % 2 === 0 ? "bg-[#FAFCFF]" : "bg-[#FFFFFF]"
                }`}
              >
                <td className="px-4 py-3 font-medium flex items-center gap-2">
                  <Checkbox
                    checked={isAllChecked}
                    onCheckedChange={() => toggleAllForModule(module)}
                    className="mr-6"
                  />
                  {module}
                </td>
                {actions.map((action) => (
                  <td key={action} className="p-2 text-center">
                    <Checkbox
                      checked={value?.[module]?.[action] || false}
                      onCheckedChange={() => toggleSingle(module, action)}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
