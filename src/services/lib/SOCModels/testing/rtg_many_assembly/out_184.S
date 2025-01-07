.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x24 , 2
		lui      x4 , 4
		lui      x31 , 1
		lui      x8 , 0
		lui      x19 , 6
		lui      x29 , 1
		lui      x27 , 2
		lui      x12 , 9
		sw       x6 , 72 (x24) 
		sw       x11 , 76 (x4) 
		sw       x25 , 80 (x31) 
		sw       x23 , 84 (x8) 
		sw       x26 , 88 (x19) 
		sw       x20 , 92 (x29) 
		sw       x22 , 96 (x27) 
		sw       x17 , 100 (x12) 
		lw       x21 , 100 (x12) 
		lw       x7 , 96 (x27) 
		lw       x15 , 92 (x29) 
		lw       x13 , 88 (x19) 
		lw       x18 , 84 (x8) 
		lw       x30 , 80 (x31) 
		lw       x5 , 76 (x4) 
		lw       x3 , 72 (x24) 
		bne      x3 , x6 , Fail
		bne      x5 , x11 , Fail
		bne      x30 , x25 , Fail
		bne      x18 , x23 , Fail
		bne      x13 , x26 , Fail
		bne      x15 , x20 , Fail
		bne      x7 , x22 , Fail
		bne      x21 , x17 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
