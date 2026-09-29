import { profile } from "../constants";
import { GithubIcon, LinkedinIcon, MailIcon, FileIcon } from "../components/ui/Icons";

const socials = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.github, Icon: GithubIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: "Resume", href: profile.resume, Icon: FileIcon },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="flex flex-col justify-center">
        <p className="!cursor-default">
          {profile.title} · {profile.location}
        </p>
      </div>
      <div className="socials">
        {socials.map((s) => {
          const { label, href, Icon } = s;
          return (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            className="icon"
          >
            <Icon className="size-5 text-white-50" />
          </a>
          );
        })}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-center md:text-end !cursor-default">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
