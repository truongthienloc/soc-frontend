.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x5 , 6
		lui      x15 , 1
		lui      x8 , 4
		lui      x29 , 7
		lui      x28 , 6
		lui      x9 , 1
		lui      x30 , 6
		lui      x14 , 8
		sw       x12 , 76 (x5) 
		sw       x19 , 80 (x15) 
		sw       x21 , 84 (x8) 
		sw       x26 , 88 (x29) 
		sw       x25 , 92 (x28) 
		sw       x16 , 96 (x9) 
		sw       x31 , 100 (x30) 
		sw       x22 , 104 (x14) 
		lw       x20 , 104 (x14) 
		lw       x7 , 100 (x30) 
		lw       x17 , 96 (x9) 
		lw       x18 , 92 (x28) 
		lw       x6 , 88 (x29) 
		lw       x2 , 84 (x8) 
		lw       x13 , 80 (x15) 
		lw       x3 , 76 (x5) 
		bne      x3 , x12 , Fail
		bne      x13 , x19 , Fail
		bne      x2 , x21 , Fail
		bne      x6 , x26 , Fail
		bne      x18 , x25 , Fail
		bne      x17 , x16 , Fail
		bne      x7 , x31 , Fail
		bne      x20 , x22 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
