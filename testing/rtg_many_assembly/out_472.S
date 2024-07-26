.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x4 , 1
		lui      x15 , 0
		lui      x9 , 2
		lui      x10 , 3
		lui      x27 , 6
		lui      x25 , 7
		lui      x12 , 8
		lui      x30 , 6
		sw       x5 , 64 (x4) 
		sw       x13 , 68 (x15) 
		sw       x14 , 72 (x9) 
		sw       x29 , 76 (x10) 
		sw       x26 , 80 (x27) 
		sw       x21 , 84 (x25) 
		sw       x20 , 88 (x12) 
		sw       x8 , 92 (x30) 
		lw       x11 , 92 (x30) 
		lw       x19 , 88 (x12) 
		lw       x16 , 84 (x25) 
		lw       x22 , 80 (x27) 
		lw       x2 , 76 (x10) 
		lw       x24 , 72 (x9) 
		lw       x6 , 68 (x15) 
		lw       x23 , 64 (x4) 
		bne      x23 , x5 , Fail
		bne      x6 , x13 , Fail
		bne      x24 , x14 , Fail
		bne      x2 , x29 , Fail
		bne      x22 , x26 , Fail
		bne      x16 , x21 , Fail
		bne      x19 , x20 , Fail
		bne      x11 , x8 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
