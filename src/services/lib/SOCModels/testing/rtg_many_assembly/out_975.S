.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x18 , x0 , x0 	#i
		addi    x14 , x0 , 1 	#Result
		addi    x8 , x0 , 8 	#x
		addi    x22 , x0 , 2 	#n
Loop:
		bge     x18 , x22 , Result 
		slli    x18 , x18 , 3 
		addi    x18 , x18 , 1 
		jal     x0 , Loop
Result:
		addi    x7 , x0 , 64 
		bne     x18 , x7 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
