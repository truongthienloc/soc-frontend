.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x29 , 8
		lui      x3 , 4
		lui      x17 , 7
		lui      x2 , 6
		lui      x25 , 2
		lui      x4 , 8
		lui      x31 , 2
		lui      x15 , 5
		sw       x6 , 64 (x29) 
		sw       x30 , 68 (x3) 
		sw       x11 , 72 (x17) 
		sw       x28 , 76 (x2) 
		sw       x26 , 80 (x25) 
		sw       x12 , 84 (x4) 
		sw       x24 , 88 (x31) 
		sw       x20 , 92 (x15) 
		lw       x10 , 92 (x15) 
		lw       x9 , 88 (x31) 
		lw       x13 , 84 (x4) 
		lw       x7 , 80 (x25) 
		lw       x14 , 76 (x2) 
		lw       x18 , 72 (x17) 
		lw       x8 , 68 (x3) 
		lw       x5 , 64 (x29) 
		bne      x5 , x6 , Fail
		bne      x8 , x30 , Fail
		bne      x18 , x11 , Fail
		bne      x14 , x28 , Fail
		bne      x7 , x26 , Fail
		bne      x13 , x12 , Fail
		bne      x9 , x24 , Fail
		bne      x10 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
