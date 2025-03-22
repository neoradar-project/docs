import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "NeoRadar", // Set your product name here
  tagline: "A modern radar client for VATSIM", // Provide a brief tagline or description
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.neoradar.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "neoradar-project", // Usually your GitHub org/user name.
  projectName: "Docs", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",

          editUrl: "https://github.com/neoradar-project/docs/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: false,

        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      logo: {
        alt: "NeoRadar Logo", // Set an appropriate alt text for your logo
        src: "img/FullLogoLight.svg", // Set the path to your logo image
        srcDark: "img/FullLogoDark.svg", // Set the path to your dark mode logo image
        width: 120,
        href: "/", // Set the URL to redirect when the logo is clicked
      },
      items: [
        {
          type: "doc",
          docId: "Introduction/getting-started",
          position: "left",
          label: "Getting Started", // Customize the label for your documentation
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/neoradar-project/docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    // footer: {
    //   style: "dark",
    //   links: [
    //     // {
    //     //   title: "Docs",
    //     //   items: [
    //     //     {
    //     //       label: "Tutorial",
    //     //       to: "/docs/intro",
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   title: "Community",
    //     //   items: [
    //     //     {
    //     //       label: "Stack Overflow",
    //     //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
    //     //     },
    //     //     {
    //     //       label: "Discord",
    //     //       href: "https://discordapp.com/invite/docusaurus",
    //     //     },
    //     //     {
    //     //       label: "X",
    //     //       href: "https://x.com/docusaurus",
    //     //     },
    //     //   ],
    //     // },
    //     {
    //       title: "More",
    //       items: [
    //         // {
    //         //   label: "Blog",
    //         //   to: "/blog",
    //         // },
    //         {
    //           label: "GitHub",
    //           href: "https://github.com/neoradar-project/docs",
    //         },
    //       ],
    //     },
    // ],
    //   copyright: `Copyright © ${new Date().getFullYear()} NeoRadar`,
    // },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
