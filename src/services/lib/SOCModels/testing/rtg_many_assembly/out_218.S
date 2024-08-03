.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x25 , 1
		auipc    x11 , 2
		auipc    x15 , 7
		auipc    x6 , 3
		lui      x27 , 6
		lui      x1 , 7
		lui      x26 , 6
		lui      x23 , 4
		sw       x5 , 8 (x25) 
		sw       x31 , 12 (x11) 
		sw       x16 , 16 (x15) 
		sw       x19 , 20 (x6) 
		sw       x30 , 24 (x27) 
		sw       x3 , 28 (x1) 
		sw       x20 , 32 (x26) 
		sw       x4 , 36 (x23) 
		lw       x14 , 36 (x23) 
		lw       x21 , 32 (x26) 
		lw       x24 , 28 (x1) 
		lw       x2 , 24 (x27) 
		lw       x22 , 20 (x6) 
		lw       x17 , 16 (x15) 
		lw       x29 , 12 (x11) 
		lw       x28 , 8 (x25) 
		bne      x28 , x5 , Fail
		bne      x29 , x31 , Fail
		bne      x17 , x16 , Fail
		bne      x22 , x19 , Fail
		bne      x2 , x30 , Fail
		bne      x24 , x3 , Fail
		bne      x21 , x20 , Fail
		bne      x14 , x4 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
