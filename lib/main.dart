import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
            backgroundColor: const Color.fromARGB(255, 240, 79, 79),
            title: const Text('Vinted 2.0')),
        body: const Column(children: [
          Icon(Icons.backpack_sharp),
          Icon(Icons.payments_sharp),
        ]),
        floatingActionButton: FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: () {
            if (kDebugMode) {
              print("pressed");
            }
          },
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.school),
              label: 'School',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.business),
              label: 'Business',
            ),
          ],
        ),
      ),
    );
  }
}
