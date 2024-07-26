.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x5 , x0 , 4 
		add     x25 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x3 , x0 , 44 
		addi    x9 , x0 , 2 
InArr:
		addi    x17 , x0 , 24 
		addi    x24 , x0 , 12 
		addi    x26 , x0 , 60 
		addi    x29 , x0 , 48 
		sb      x17 , 4 (x3) 
		sb      x24 , 8 (x3) 
		sb      x26 , 12 (x3) 
		sb      x29 , 16 (x3) 
Loop:
		sll     x7 , x31 , x9 
		add     x30 , x7 , x3 
		lbu     x1 , 4 (x30) 
		add     x25 , x25 , x1 
		addi    x31 , x31 , 1 
		beq     x31 , x5 , Result 
		jal     x0 , Loop 
Result:
		addi    x18 , x0 , 144 
		bne     x18 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
