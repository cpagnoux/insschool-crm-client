class TimeHelper {
  public static getDuration(startTime: string, endTime: string): string {
    if (!this.isValidTime(startTime) || !this.isValidTime(endTime)) {
      return '';
    }

    const [startHours, startMinutes] = startTime.split(':');
    const [endHours, endMinutes] = endTime.split(':');

    const hours = +endHours - +startHours;
    const minutes = +endMinutes - +startMinutes;

    return `${hours}h ${minutes}min`;
  }

  public static toDisplayString(time: string): string {
    if (!this.isValidTime(time)) {
      return '';
    }

    const [hours, minutes] = time.split(':');

    return `${hours}h${minutes}`;
  }

  private static isValidTime(time: string): boolean {
    return Boolean(time && time.match(/^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$/));
  }
}

export default TimeHelper;
