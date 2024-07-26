.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x12 , 9
		lui      x9 , 8
		lui      x6 , 3
		lui      x19 , 5
		lui      x25 , 5
		lui      x29 , 7
		lui      x15 , 0
		lui      x8 , 1
		sw       x10 , 24 (x12) 
		sw       x26 , 28 (x9) 
		sw       x2 , 32 (x6) 
		sw       x20 , 36 (x19) 
		sw       x14 , 40 (x25) 
		sw       x31 , 44 (x29) 
		sw       x11 , 48 (x15) 
		sw       x4 , 52 (x8) 
		lw       x27 , 52 (x8) 
		lw       x5 , 48 (x15) 
		lw       x24 , 44 (x29) 
		lw       x21 , 40 (x25) 
		lw       x22 , 36 (x19) 
		lw       x7 , 32 (x6) 
		lw       x13 , 28 (x9) 
		lw       x23 , 24 (x12) 
		bne      x23 , x10 , Fail
		bne      x13 , x26 , Fail
		bne      x7 , x2 , Fail
		bne      x22 , x20 , Fail
		bne      x21 , x14 , Fail
		bne      x24 , x31 , Fail
		bne      x5 , x11 , Fail
		bne      x27 , x4 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
