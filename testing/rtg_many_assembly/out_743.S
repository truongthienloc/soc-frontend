.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x31 , 2
		lui      x17 , 9
		lui      x29 , 9
		lui      x12 , 3
		lui      x23 , 7
		lui      x27 , 4
		lui      x8 , 1
		lui      x3 , 7
		sw       x25 , 24 (x31) 
		sw       x20 , 28 (x17) 
		sw       x11 , 32 (x29) 
		sw       x14 , 36 (x12) 
		sw       x16 , 40 (x23) 
		sw       x26 , 44 (x27) 
		sw       x6 , 48 (x8) 
		sw       x19 , 52 (x3) 
		lw       x21 , 52 (x3) 
		lw       x15 , 48 (x8) 
		lw       x13 , 44 (x27) 
		lw       x5 , 40 (x23) 
		lw       x30 , 36 (x12) 
		lw       x2 , 32 (x29) 
		lw       x4 , 28 (x17) 
		lw       x7 , 24 (x31) 
		bne      x7 , x25 , Fail
		bne      x4 , x20 , Fail
		bne      x2 , x11 , Fail
		bne      x30 , x14 , Fail
		bne      x5 , x16 , Fail
		bne      x13 , x26 , Fail
		bne      x15 , x6 , Fail
		bne      x21 , x19 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
