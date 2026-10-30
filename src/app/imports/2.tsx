function PulseSpinnerPulse() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Pulse/Spinner-Pulse-1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Pulse/Spinner-Pulse-1">
          <circle cx="24" cy="24" id="Ellipse 30" r="17" stroke="var(--stroke-0, #D9D9D9)" strokeWidth="6" />
          <circle cx="24" cy="24" fill="var(--fill-0, white)" id="Ellipse 31" r="6" />
        </g>
      </svg>
    </div>
  );
}

export default function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="2">
      <PulseSpinnerPulse />
    </div>
  );
}