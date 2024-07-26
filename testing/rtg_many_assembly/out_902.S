.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x1 , x0 , 4 
		add     x24 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x28 , x0 , 40 
InArr:
		addi    x10 , x0 , 72 
		addi    x19 , x0 , 4 
		addi    x3 , x0 , 28 
		addi    x18 , x0 , 64 
		sw      x10 , 116 (x28) 
		sw      x19 , 120 (x28) 
		sw      x3 , 124 (x28) 
		sw      x18 , 128 (x28) 
Loop:
		slli    x16 , x25 , 2 
		add     x27 , x16 , x28 
		lw      x6 , 116 (x27) 
		add     x24 , x24 , x6 
		addi    x25 , x25 , 1 
		beq     x25 , x1 , Result 
		jal     x0 , Loop
Result:
		addi    x30 , x0 , 168 
		bne     x30 , x24 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
