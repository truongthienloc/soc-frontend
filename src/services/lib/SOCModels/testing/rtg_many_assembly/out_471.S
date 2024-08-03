.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x14 , x0 , 4 
		add     x4 , x0 , x0 
		add     x9 , x0 , x0 
		addi    x6 , x0 , 0 
		addi    x26 , x0 , 2 
InArr:
		addi    x11 , x0 , 48 
		addi    x24 , x0 , 76 
		addi    x31 , x0 , 52 
		addi    x25 , x0 , 24 
		sh      x11 , 64 (x6) 
		sh      x24 , 68 (x6) 
		sh      x31 , 72 (x6) 
		sh      x25 , 76 (x6) 
Loop:
		sll     x18 , x9 , x26 
		add     x23 , x18 , x6 
		lhu     x15 , 64 (x23) 
		add     x4 , x4 , x15 
		addi    x9 , x9 , 1 
		beq     x9 , x14 , Result 
		jal     x0 , Loop 
Result:
		addi    x10 , x0 , 200 
		bne     x10 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
