.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x8 , 0
		auipc    x7 , 2
		auipc    x19 , 9
		auipc    x2 , 8
		lui      x20 , 8
		lui      x27 , 4
		lui      x3 , 6
		lui      x25 , 2
		sw       x16 , 16 (x8) 
		sw       x30 , 20 (x7) 
		sw       x1 , 24 (x19) 
		sw       x5 , 28 (x2) 
		sw       x17 , 32 (x20) 
		sw       x29 , 36 (x27) 
		sw       x21 , 40 (x3) 
		sw       x6 , 44 (x25) 
		lw       x10 , 44 (x25) 
		lw       x9 , 40 (x3) 
		lw       x12 , 36 (x27) 
		lw       x26 , 32 (x20) 
		lw       x18 , 28 (x2) 
		lw       x11 , 24 (x19) 
		lw       x4 , 20 (x7) 
		lw       x13 , 16 (x8) 
		bne      x13 , x16 , Fail
		bne      x4 , x30 , Fail
		bne      x11 , x1 , Fail
		bne      x18 , x5 , Fail
		bne      x26 , x17 , Fail
		bne      x12 , x29 , Fail
		bne      x9 , x21 , Fail
		bne      x10 , x6 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
