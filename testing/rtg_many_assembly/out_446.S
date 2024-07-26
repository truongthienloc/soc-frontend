.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x24 , 2
		auipc    x16 , 8
		auipc    x20 , 6
		auipc    x12 , 1
		lui      x4 , 3
		lui      x19 , 0
		lui      x26 , 7
		lui      x15 , 3
		sw       x25 , 48 (x24) 
		sw       x9 , 52 (x16) 
		sw       x7 , 56 (x20) 
		sw       x14 , 60 (x12) 
		sw       x6 , 64 (x4) 
		sw       x8 , 68 (x19) 
		sw       x30 , 72 (x26) 
		sw       x22 , 76 (x15) 
		lw       x5 , 76 (x15) 
		lw       x23 , 72 (x26) 
		lw       x18 , 68 (x19) 
		lw       x27 , 64 (x4) 
		lw       x2 , 60 (x12) 
		lw       x1 , 56 (x20) 
		lw       x31 , 52 (x16) 
		lw       x3 , 48 (x24) 
		bne      x3 , x25 , Fail
		bne      x31 , x9 , Fail
		bne      x1 , x7 , Fail
		bne      x2 , x14 , Fail
		bne      x27 , x6 , Fail
		bne      x18 , x8 , Fail
		bne      x23 , x30 , Fail
		bne      x5 , x22 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
