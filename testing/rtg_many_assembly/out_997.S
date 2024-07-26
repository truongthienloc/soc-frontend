.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x14 , x0 , x0 
		add     x28 , x0 , x0 
		addi    x20 , x0 , 48 
InArr:
		addi    x17 , x0 , 176 
		addi    x23 , x0 , 64 
		addi    x4 , x0 , 8 
		addi    x12 , x0 , 48 
		sw      x17 , 36 (x20) 
		sw      x23 , 40 (x20) 
		sw      x4 , 44 (x20) 
		sw      x12 , 48 (x20) 
Loop:
		slli    x18 , x28 , 2 
		add     x9 , x18 , x20 
		lw      x27 , 36 (x9) 
		add     x14 , x14 , x27 
		addi    x28 , x28 , 1 
		beq     x28 , x22 , Result 
		jal     x0 , Loop
Result:
		addi    x3 , x0 , 296 
		bne     x3 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
