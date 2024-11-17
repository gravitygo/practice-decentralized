import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  // currentValue := 100;

  stable var startTime = Time.now();

  Debug.print(debug_show(startTime));

  // Debug.print(debug_show(currentValue));

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    if (currentValue >= amount){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else{
        Debug.print("Can't withdraw more than you own");
    }
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNano = currentTime - startTime;
    let timeElapsedSeconds = timeElapsedNano / 1_000_000_000;

    currentValue := currentValue * ((1 + 0.01) ** Float.fromInt(timeElapsedSeconds));
    startTime := currentTime;
  }
}
