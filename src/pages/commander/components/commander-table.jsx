import { useQuery } from "@tanstack/react-query";

const CommanderTable = () => {
  const { data: commanderInfo = {} } = useQuery({
    queryKey: ["commander-info"],
    queryFn: async () => {
      const res = await fetch(``);
      const data = await res.json();
      return data;
    },
  });

  console.log("commanderInfo: ", commanderInfo);

  return <div>CommanderTable</div>;
};

export default CommanderTable;
