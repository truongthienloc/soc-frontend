.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , -2048 
		addi    x6 , x0 , 5 
		sltu    x22 , x5 , x6 
		bltu    x5 , x6 , Less_i 
		bgeu    x5 , x6 , Bigger_i 
Less_i:
		ori     x17 , x5 , 131 
		sub     x29 , x6 , x5 
		srai    x29 , x29 , 1 
		and     x29 , x29 , x0 
		addi    x28 , x0 , 0 
		beq     x29 , x28 , Pass 
Bigger_i:
		ori     x17 , x5 , 174 
		sub     x29 , x6 , x5 
		srai    x29 , x29 , 2 
		and     x29 , x29 , x0 
		addi    x28 , x0 , 0 
		beq     x29 , x28 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
