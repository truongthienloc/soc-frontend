.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x11 , x0 , x0 
		add     x15 , x0 , x0 
		addi    x16 , x0 , 16 
		addi    x6 , x0 , 2 
InArr:
		addi    x17 , x0 , 40 
		addi    x30 , x0 , 0 
		addi    x26 , x0 , 0 
		addi    x20 , x0 , 60 
		sb      x17 , 0 (x16) 
		sb      x30 , 4 (x16) 
		sb      x26 , 8 (x16) 
		sb      x20 , 12 (x16) 
Loop:
		sll     x2 , x15 , x6 
		add     x7 , x2 , x16 
		lbu     x13 , 0 (x7) 
		add     x11 , x11 , x13 
		addi    x15 , x15 , 1 
		beq     x15 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x25 , x0 , 100 
		bne     x25 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
