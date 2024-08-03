.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x21 , x0 , 4 
		add     x1 , x0 , x0 
		add     x20 , x0 , x0 
		addi    x6 , x0 , 48 
		addi    x15 , x0 , 2 
InArr:
		addi    x31 , x0 , 24 
		addi    x19 , x0 , 40 
		addi    x18 , x0 , 44 
		addi    x30 , x0 , 40 
		sb      x31 , 60 (x6) 
		sb      x19 , 64 (x6) 
		sb      x18 , 68 (x6) 
		sb      x30 , 72 (x6) 
Loop:
		sll     x27 , x20 , x15 
		add     x7 , x27 , x6 
		lbu     x22 , 60 (x7) 
		add     x1 , x1 , x22 
		addi    x20 , x20 , 1 
		beq     x20 , x21 , Result 
		jal     x0 , Loop 
Result:
		addi    x28 , x0 , 148 
		bne     x28 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
