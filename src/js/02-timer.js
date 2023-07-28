import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', 'true');
refs.startBtn.addEventListener('click', onClickStartBtn);

const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const deltaDate = selectedDates[0] - Date.now();
        if (deltaDate < 0) {
            return alert('Please choose a date in the future');
        } else {
            refs.startBtn.removeAttribute('disabled');
        }
    },
});

class Timer {
    constructor() {
        const startTime = fp.selectedDates[0].getTime();
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const { days, hours, minutes, seconds } = this.convertMs(deltaTime);

            if (deltaTime < 1000) {
                clearInterval(this.intervalId);
                refs.startBtn.disabled = false;
            }
            
            refs.days.textContent = this.addLeadingZero(`${days}`);
            refs.hours.textContent = this.addLeadingZero(`${hours}`);
            refs.minutes.textContent = this.addLeadingZero(`${minutes}`);
            refs.seconds.textContent = this.addLeadingZero(`${seconds}`);
            
            console.log(`${days}:${hours}:${minutes}:${seconds}`);
        }, 1000);
    }
    
    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
        return { days, hours, minutes, seconds };
    };

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    };

    start() {
    };
}

function onClickStartBtn() {
    const timer = new Timer();
    timer.start();
    refs.input.disabled = true;
    refs.startBtn.disabled = true;
};