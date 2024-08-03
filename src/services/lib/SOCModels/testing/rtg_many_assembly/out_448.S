.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x19 , x0 , x0 	#i
		addi    x22 , x0 , 1 	#Result
		addi    x21 , x0 , 0 	#x
		addi    x3 , x0 , 1 	#n
Loop:
		bge     x19 , x3 , Result 
		slli    x19 , x19 , 3 
		addi    x19 , x19 , 1 
		jal     x0 , Loop
Result:
		addi    x24 , x0 , 0 
		bne     x19 , x24 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
