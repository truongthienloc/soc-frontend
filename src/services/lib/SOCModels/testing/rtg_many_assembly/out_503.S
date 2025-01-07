.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x10 , 4
		auipc    x6 , 1
		auipc    x24 , 2
		auipc    x8 , 0
		lui      x15 , 6
		lui      x13 , 2
		lui      x20 , 2
		lui      x19 , 2
		sw       x1 , 4 (x10) 
		sw       x3 , 8 (x6) 
		sw       x9 , 12 (x24) 
		sw       x2 , 16 (x8) 
		sw       x11 , 20 (x15) 
		sw       x28 , 24 (x13) 
		sw       x31 , 28 (x20) 
		sw       x21 , 32 (x19) 
		lw       x25 , 32 (x19) 
		lw       x26 , 28 (x20) 
		lw       x29 , 24 (x13) 
		lw       x27 , 20 (x15) 
		lw       x14 , 16 (x8) 
		lw       x5 , 12 (x24) 
		lw       x7 , 8 (x6) 
		lw       x12 , 4 (x10) 
		bne      x12 , x1 , Fail
		bne      x7 , x3 , Fail
		bne      x5 , x9 , Fail
		bne      x14 , x2 , Fail
		bne      x27 , x11 , Fail
		bne      x29 , x28 , Fail
		bne      x26 , x31 , Fail
		bne      x25 , x21 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
