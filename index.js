var SingletonMixin = {

  _instance: null,

  getInstance: function getInstance() {
    if (this._instance !== null) {
      return this._instance;
    }
    var args = Array.prototype.slice.apply(arguments);
    var bind = Function.prototype.bind;
    this._instance = new (bind.apply(this, [null].concat(args)))();
    return this._instance;
  },

  clearInstance: function clearInstance() {
    // Overwrite for each classes if needed
    if (this.destructInstance) {
      this.destructInstance();
    }
    this._instance = null;
  }
};

module.exports = SingletonMixin;
