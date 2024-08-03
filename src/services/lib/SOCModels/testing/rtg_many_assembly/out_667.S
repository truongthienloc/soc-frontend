.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x20 , x0 , x0 
		add     x10 , x0 , x0 
		addi    x26 , x0 , 16 
InArr:
		addi    x9 , x0 , 20 
		addi    x30 , x0 , 76 
		addi    x1 , x0 , 40 
		addi    x12 , x0 , 28 
		sb      x9 , 12 (x26) 
		sb      x30 , 16 (x26) 
		sb      x1 , 20 (x26) 
		sb      x12 , 24 (x26) 
Loop:
		slli    x18 , x10 , 2 
		add     x17 , x18 , x26 
		lb      x24 , 12 (x17) 
		add     x20 , x20 , x24 
		addi    x10 , x10 , 1 
		beq     x10 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x27 , x0 , 164 
		bne     x27 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
