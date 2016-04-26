const int piezoA = 0;
const int piezoB = 2;
const int piezoC = 4;

void setup()
{
  Serial.begin(9600);
}

void loop() {
  sendPiezoA();
  delay(10);
  sendPiezoB();
  delay(10);
  sendPiezoC();
  delay(10);
}

void sendPiezoA() {
  int val= analogRead(piezoA);
  String stringA = "A: ";
  String sendStringA = stringA + val;
  Serial.println(sendStringA);  
  return;
}

void sendPiezoB() {
  int val= analogRead(piezoB);
  String stringB = "B: ";
  String sendStringB = stringB + val;
  Serial.println(sendStringB);  
  return;
}

void sendPiezoC() {
  int val= analogRead(piezoC);
  String stringC = "C: ";
  String sendStringC = stringC + val;
  Serial.println(sendStringC);  
  return;
}

