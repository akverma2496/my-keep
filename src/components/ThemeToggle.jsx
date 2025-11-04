import { ActionIcon, useMantineColorScheme, Group } from "@mantine/core";

const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Group align="center" spacing="xs">
      <ActionIcon
        onClick={() => setColorScheme(isDark ? "light" : "dark")}
        title="Toggle color scheme"
        style={{
          fontSize: "1.2rem",
          backgroundColor: "transparent",
          color: isDark ? "yellow" : "blue", 
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </ActionIcon>
    </Group>
  );
};

export default ThemeToggle;
