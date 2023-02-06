//
//  biometric.swift
//  biometricApp
//
//  Created by Ankit Chaudhary on 19/01/23.
//

import Foundation

@objc(Biometric)
class Biometric : NSObject{
  
  private var count = 0;
  
  @objc
  func increment(){
    print("hello")
    count += 1
    print(count)
  }
  
}
