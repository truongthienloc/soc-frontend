.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x13 , x0 , 4 
		add     x14 , x0 , x0 
		add     x29 , x0 , x0 
		addi    x20 , x0 , 4 
InArr:
		addi    x12 , x0 , 60 
		addi    x23 , x0 , 0 
		addi    x9 , x0 , 20 
		addi    x31 , x0 , 44 
		sw      x12 , 60 (x20) 
		sw      x23 , 64 (x20) 
		sw      x9 , 68 (x20) 
		sw      x31 , 72 (x20) 
Loop:
		slli    x25 , x29 , 2 
		add     x21 , x25 , x20 
		lw      x1 , 60 (x21) 
		add     x14 , x14 , x1 
		addi    x29 , x29 , 1 
		beq     x29 , x13 , Result 
		jal     x0 , Loop
Result:
		addi    x4 , x0 , 124 
		bne     x4 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
