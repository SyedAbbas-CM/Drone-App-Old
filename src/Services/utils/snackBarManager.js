export default class SnackBarManager {
  static snackbar

  static setSnackBar(dropDown) {
    this.snackbar = dropDown
  }

  static getSnackBar() {
    return this.snackbar
  }
}
