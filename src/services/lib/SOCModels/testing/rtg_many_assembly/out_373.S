.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 180 
		addi    x10 , x0 , -2048 
		slti    x30 , x22 , 951 
		bltu    x22 , x10 , Less_i 
		bgeu    x22 , x10 , Bigger_i 
Less_i:
		ori     x5 , x22 , 29 
		sub     x19 , x10 , x22 
		srai    x19 , x19 , 1 
		and     x19 , x19 , x0 
		addi    x8 , x0 , 0 
		beq     x19 , x8 , Pass 
Bigger_i:
		ori     x5 , x22 , 92 
		sub     x19 , x10 , x22 
		srai    x19 , x19 , 3 
		and     x19 , x19 , x0 
		addi    x8 , x0 , 0 
		beq     x19 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
