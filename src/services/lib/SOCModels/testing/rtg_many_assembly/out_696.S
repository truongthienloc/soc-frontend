.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x7 , 8
		auipc    x17 , 8
		auipc    x9 , 4
		auipc    x6 , 5
		lui      x26 , 8
		lui      x16 , 5
		lui      x20 , 0
		lui      x5 , 3
		sw       x3 , 56 (x7) 
		sw       x28 , 60 (x17) 
		sw       x25 , 64 (x9) 
		sw       x24 , 68 (x6) 
		sw       x14 , 72 (x26) 
		sw       x15 , 76 (x16) 
		sw       x31 , 80 (x20) 
		sw       x13 , 84 (x5) 
		lw       x23 , 84 (x5) 
		lw       x22 , 80 (x20) 
		lw       x10 , 76 (x16) 
		lw       x4 , 72 (x26) 
		lw       x27 , 68 (x6) 
		lw       x11 , 64 (x9) 
		lw       x8 , 60 (x17) 
		lw       x12 , 56 (x7) 
		bne      x12 , x3 , Fail
		bne      x8 , x28 , Fail
		bne      x11 , x25 , Fail
		bne      x27 , x24 , Fail
		bne      x4 , x14 , Fail
		bne      x10 , x15 , Fail
		bne      x22 , x31 , Fail
		bne      x23 , x13 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
