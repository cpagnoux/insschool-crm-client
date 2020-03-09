class DateHelper {
  public static toDisplayString(date: string): string {
    if (!this.isValidDate(date)) {
      return '';
    }

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  private static isValidDate(date: string): boolean {
    return Boolean(date && date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/));
  }
}

export default DateHelper;
