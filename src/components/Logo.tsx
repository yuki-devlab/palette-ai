export default function Logo() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <defs>
                <linearGradient id="border" x1="73.44" y1="73.44" x2="950.56" y2="950.56" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#e1f5fe" />
                    <stop offset="1" stopColor="#0091ea" stop-opacity=".5" />
                </linearGradient>

                <linearGradient id="base" x1="270.03" y1="325.92" x2="793.73" y2="849.62" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".48" stopColor="#fdfefe" />
                    <stop offset=".65" stopColor="#f6fcfe" />
                    <stop offset=".77" stopColor="#eaf7fe" />
                    <stop offset=".87" stopColor="#d9f2fd" />
                    <stop offset=".95" stopColor="#c3eafc" />
                    <stop offset="1" stopColor="#b3e5fc" />
                </linearGradient>

                <linearGradient id="red" x1="257.95" y1="444.15" x2="348.17" y2="534.37" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ef9a9a" />
                    <stop offset="1" stopColor="#f44336" />
                </linearGradient>

                <linearGradient id="green" x1="445.56" y1="372.05" x2="533.53" y2="460.02" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#a5d6a7" />
                    <stop offset="1" stopColor="#4caf50" />
                </linearGradient>

                <linearGradient id="blue" x1="641.37" y1="397.52" x2="727.85" y2="484.01" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#90caf9" />
                    <stop offset="1" stopColor="#2196f3" />
                </linearGradient>

                <linearGradient id="sparkle" x1="783.83" y1="165.31" x2="859.2" y2="240.68" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".48" stopColor="#fdfefe" />
                    <stop offset=".65" stopColor="#f6fcfe" />
                    <stop offset=".77" stopColor="#eaf7fe" />
                    <stop offset=".87" stopColor="#d9f2fd" />
                    <stop offset=".95" stopColor="#c3eafc" />
                    <stop offset="1" stopColor="#b3e5fc" />
                </linearGradient>

                <filter id="shadow1" x="58" y="207" width="918" height="769" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="5" dy="5" stdDeviation="25" flood-color="#0277bd" flood-opacity=".25" />
                </filter>

                <filter id="shadow2" x="677" y="58" width="299" height="300" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="5" dy="5" stdDeviation="25" flood-color="#0277bd" flood-opacity=".25" />
                </filter>
            </defs>

            <rect width="1024" height="1024" rx="250" fill="#00bcff" />
            <rect x="5" y="5" width="1014" height="1014" rx="245" fill="none" stroke="url(#border)" strokeWidth="10" />

            <path
                d="M895.86,683.16c-1.03-31.62-18.81-59.8-46.59-74.97-20.68-12.52-47.52-16.8-62.74-36.98-14.45-19.01-2.96-42.81,14.4-55.33,11.65-9.13,27.32-14.29,39.08-24.13,38.29-29.92,13.55-84.94-13.3-114.16-81.33-88.97-229.88-106.78-344.2-98.18-144.78,9.6-311.14,80.32-346.84,234.74-40.34,173.53,84.32,307.89,242.5,355.97,67.01,20.56,138,28.19,208.09,24.44,63.24-4.5,126.97-16.34,184.05-44.7,64.24-31.01,129.11-89.54,125.56-166.71ZM631.87,889.23c-.14.03-.81.07-.9.04.22-.02.84-.06.97-.05h-.08ZM695.48,708.67c-22.67-2.75-48.39-17.56-50.89-42.41-3.42-43.5,50.74-63.15,84.41-43.3l.14.08c15.03,8.41,26.75,23.85,26.87,41.51-.18,33.26-30.9,47.33-60.53,44.12Z"
                fill="url(#base)"
                filter="url(#shadow1)" />

            <path
                d="M364.61,489.36c0,11.39-2.46,21.77-7.78,30.97-5.49,9.49-11.85,19.5-21.33,24.99-9.19,5.32-20.92,8.35-32.31,8.35s-23.29-2.72-32.49-8.04c-9.49-5.49-16.17-15.53-21.65-25.01-5.32-9.19-7.03-19.87-7.03-31.26s-.25-23.2,5.07-32.39c5.49-9.49,15.24-16.48,24.72-21.96,9.19-5.32,20-9.3,31.38-9.3s20.82,6.34,30.02,11.66c9.49,5.49,21.14,9.81,26.63,19.29,5.32,9.19,4.77,21.32,4.77,32.71Z"
                fill="url(#red)" />

            <path
                d="M550.18,415.45c0,11.39-.98,21.61-6.3,30.8-5.49,9.49-12.78,17.55-22.27,23.04-9.19,5.32-19.7,11.55-31.08,11.55s-23.6-3.26-32.8-8.58c-9.49-5.49-14.65-16.76-20.14-26.24-5.32-9.19-9.58-19.17-9.58-30.56s2.46-22.41,7.78-31.61,14.57-16.06,24.06-21.55c9.19-5.32,19.3-8.09,30.69-8.09s20.51,4.47,29.7,9.79c9.49,5.49,19.53,10.37,25.02,19.86,5.32,9.19,4.93,20.21,4.93,31.59Z"
                fill="url(#green)" />

            <path
                d="M745.46,441.09c0,11.39-3.24,20.57-8.56,29.76-5.49,9.49-11.61,17.51-21.1,23-9.19,5.32-19.07,12-30.46,12s-21.06-7.02-30.26-12.34c-9.49-5.49-20.75-10.31-26.23-19.8-5.32-9.19-4.8-21.23-4.8-32.62s1.55-22.22,6.87-31.42c5.49-9.49,14.9-15.13,24.38-20.61,9.19-5.32,18.65-11.66,30.04-11.66s20.72,6.55,29.91,11.87c9.49,5.49,20.6,10,26.09,19.49,5.32,9.19,4.12,20.95,4.12,32.33Z"
                fill="url(#blue)" />

            <path
                d="M818.04,132.38c1.91-5.16,5.04-5.16,6.95,0l14.66,39.61c1.91,5.16,7.7,10.95,12.87,12.87l39.61,14.66c5.16,1.91,5.16,5.04,0,6.95l-39.61,14.66c-5.16,1.91-10.95,7.7-12.87,12.87l-14.66,39.61c-1.91,5.16-5.04,5.16-6.95,0l-14.66-39.61c-1.91-5.16-7.7-10.95-12.87-12.87l-39.61-14.66c-5.16-1.91-5.16-5.04,0-6.95l39.61-14.66c5.16-1.91,10.95-7.7,12.87-12.87l14.66-39.61Z"
                fill="url(#sparkle)"
                filter="url(#shadow2)" />
        </svg>
    );
}