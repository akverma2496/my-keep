// src/components/ThemeToggle.jsx
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={isDark ? "yellow" : "blue"}
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
      title="Toggle color scheme"
      style={{ fontSize: "1.2rem" }}
    >
      {isDark ? "🌙" : "☀️"}
    </ActionIcon>
  );
};

export default ThemeToggle;
