.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , -2048 
		addi    x26 , x0 , 67 
		sltu    x29 , x16 , x26 
		bltu    x16 , x26 , Less_i 
		bgeu    x16 , x26 , Bigger_i 
Less_i:
		ori     x4 , x16 , 3 
		sub     x5 , x26 , x16 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x17 , x0 , 0 
		beq     x5 , x17 , Pass 
Bigger_i:
		ori     x4 , x16 , 187 
		sub     x5 , x26 , x16 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x17 , x0 , 0 
		beq     x5 , x17 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
