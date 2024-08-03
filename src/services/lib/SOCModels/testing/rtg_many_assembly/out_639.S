.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 53 
		addi    x2 , x0 , -2048 
		slti    x10 , x16 , 626 
		bltu    x16 , x2 , Less_i 
		bgeu    x16 , x2 , Bigger_i 
Less_i:
		ori     x18 , x16 , 140 
		sub     x29 , x2 , x16 
		srai    x29 , x29 , 1 
		and     x29 , x29 , x0 
		addi    x19 , x0 , 0 
		beq     x29 , x19 , Pass 
Bigger_i:
		ori     x18 , x16 , 193 
		sub     x29 , x2 , x16 
		srai    x29 , x29 , 1 
		and     x29 , x29 , x0 
		addi    x19 , x0 , 0 
		beq     x29 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
