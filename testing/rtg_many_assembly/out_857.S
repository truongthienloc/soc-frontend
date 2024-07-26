.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x6 , 0
		auipc    x18 , 3
		auipc    x25 , 0
		auipc    x31 , 8
		lui      x27 , 9
		lui      x10 , 9
		lui      x2 , 9
		lui      x4 , 6
		sw       x30 , 68 (x6) 
		sw       x20 , 72 (x18) 
		sw       x17 , 76 (x25) 
		sw       x1 , 80 (x31) 
		sw       x13 , 84 (x27) 
		sw       x29 , 88 (x10) 
		sw       x24 , 92 (x2) 
		sw       x23 , 96 (x4) 
		lw       x7 , 96 (x4) 
		lw       x12 , 92 (x2) 
		lw       x3 , 88 (x10) 
		lw       x21 , 84 (x27) 
		lw       x9 , 80 (x31) 
		lw       x26 , 76 (x25) 
		lw       x11 , 72 (x18) 
		lw       x28 , 68 (x6) 
		bne      x28 , x30 , Fail
		bne      x11 , x20 , Fail
		bne      x26 , x17 , Fail
		bne      x9 , x1 , Fail
		bne      x21 , x13 , Fail
		bne      x3 , x29 , Fail
		bne      x12 , x24 , Fail
		bne      x7 , x23 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
