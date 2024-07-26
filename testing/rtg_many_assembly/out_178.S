.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x30 , 6
		auipc    x9 , 0
		auipc    x22 , 8
		auipc    x25 , 0
		lui      x19 , 2
		lui      x20 , 4
		lui      x2 , 2
		lui      x6 , 1
		sw       x17 , 8 (x30) 
		sw       x16 , 12 (x9) 
		sw       x5 , 16 (x22) 
		sw       x15 , 20 (x25) 
		sw       x14 , 24 (x19) 
		sw       x18 , 28 (x20) 
		sw       x21 , 32 (x2) 
		sw       x12 , 36 (x6) 
		lw       x13 , 36 (x6) 
		lw       x26 , 32 (x2) 
		lw       x1 , 28 (x20) 
		lw       x11 , 24 (x19) 
		lw       x27 , 20 (x25) 
		lw       x24 , 16 (x22) 
		lw       x29 , 12 (x9) 
		lw       x4 , 8 (x30) 
		bne      x4 , x17 , Fail
		bne      x29 , x16 , Fail
		bne      x24 , x5 , Fail
		bne      x27 , x15 , Fail
		bne      x11 , x14 , Fail
		bne      x1 , x18 , Fail
		bne      x26 , x21 , Fail
		bne      x13 , x12 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
