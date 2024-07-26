.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 97 
		addi    x14 , x0 , -2048 
		slti    x1 , x16 , 47 
		bltu    x16 , x14 , Less_i 
		bgeu    x16 , x14 , Bigger_i 
Less_i:
		ori     x8 , x16 , 197 
		sub     x27 , x14 , x16 
		srai    x27 , x27 , 1 
		and     x27 , x27 , x0 
		addi    x31 , x0 , 0 
		beq     x27 , x31 , Pass 
Bigger_i:
		ori     x8 , x16 , 64 
		sub     x27 , x14 , x16 
		srai    x27 , x27 , 1 
		and     x27 , x27 , x0 
		addi    x31 , x0 , 0 
		beq     x27 , x31 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
